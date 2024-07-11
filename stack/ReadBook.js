import { StyleSheet, Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import React from 'react';
import { gStyle } from '../styles/styles';

export default function ReadBook({ route }) {
  const { book } = route.params;

 
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 30; // Define how many lines you consider as one page
  const PAGES_TO_LOAD = 10; // Number of pages to load initially and when scrolling

  useEffect(() => {
    fetch(book.Booklink)
      .then(response => response.text())
      .then(data => {
        const cleanedText = data.replace(/\n\s*\n/g, '\n').trim();
        const lines = cleanedText.split('\n');

        // Split into pages of up to PAGE_SIZE lines
        const pagesArray = [];
        for (let i = 0; i < lines.length; i += PAGE_SIZE) {
          pagesArray.push(lines.slice(i, i + PAGE_SIZE).join('\n'));
        }

        setPages(pagesArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const loadMorePages = useCallback(() => {
    if (!loading && currentPage + PAGES_TO_LOAD < pages.length) {
      setLoading(true);
        setCurrentPage(prevPage => prevPage + PAGES_TO_LOAD);
        setLoading(false);
    }
  }, [loading, pages, currentPage]);

  return (
    <ScrollView
      style={gStyle.container}
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
          loadMorePages();
        }
      }}
      scrollEventThrottle={16}
    >
          <View style={styles.container}>
          {pages.slice(0, currentPage + PAGES_TO_LOAD).map((page, index) => (
          <Text key={index} style={styles.book}>{page}</Text>
        ))}
        {loading && <ActivityIndicator size="large" color="#ffffff" />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  book: {
    color: 'white',
    fontFamily: 'ari-med',
    lineHeight: 24,
    marginBottom: 0,
    padding: 10,
  },
});
