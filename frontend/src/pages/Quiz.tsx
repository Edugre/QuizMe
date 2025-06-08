import React from "react";
import Layout from '@/components/layout/Layout';
import { useLocation } from "react-router-dom";

export const Quiz = () => {

    const location = useLocation();
    const { quiz } = location.state;

    return (
        <Layout>
            <div className="min-h-screen">
                <pre>{JSON.stringify(quiz, null, 2)}</pre>
            </div>
        </Layout>
    );
}