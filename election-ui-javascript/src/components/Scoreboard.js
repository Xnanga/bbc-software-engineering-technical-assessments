import React, { useState, useEffect } from "react";
import Logo from "./logo/logo";
import fetchData from "../dataFetcher";
import Scorecard from "./Scorecard";
import "./Scoreboard.css";
import PartyLinks from "./PartyLinks";

const matchCandidateWithVotesById = (resultData, candidateData) => {
  const combinedData = resultData.map((result) => {
    const candidate = candidateData.find((candidate) => {
      return candidate.id === result.candidateId;
    });
    return { ...result, candidateName: candidate.name };
  });
  return combinedData;
};

function Scoreboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      const resultData = await fetchData();
      // console.log(resultData);
      const combinedResultsAndCandidateData = matchCandidateWithVotesById(
        resultData.results,
        resultData.candidateData
      );

      setResults(combinedResultsAndCandidateData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Scoreboard">
      <header className="Election-scoreboard-header">
        <Logo language="en" />
      </header>
      <main>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          <>
            <h1>Results</h1>
            <Scorecard results={results} />
            <button onClick={getData} className="Scoreboard-refresh">
              Refresh
            </button>
            <h1>Learn more about the parties...</h1>
            <PartyLinks />
          </>
        )}
      </main>
    </div>
  );
}

export default Scoreboard;
