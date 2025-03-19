"use client";
import React from 'react'

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    },
);

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function PDF() {
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section d'assaut</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
    return <div>
        <div className="w-full h-[600px] bg-red-200">
            <h1>test</h1>
            <PDFViewer width={"100%"} height={"100%"}>
                <MyDocument />
            </PDFViewer>
        </div>
    </div>
}

export default PDF