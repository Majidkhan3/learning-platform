"use client";
import { useSearchParams } from "next/navigation";
import FilterCard from "./FilterCard";
import Table from "./Table";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/wrappers/AuthProtectionWrapper";

const PageWithFilters = () => {
  const { user ,token} = useAuth();
  const userId = user?._id || ""; // Assuming you have a way to get the user ID
  const [availableTags, setAvailableTags] = useState([]); // State for fetched tags
  const [words, setWords] = useState([]); // State for fetched words
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState("");
  const [availableVoices, setAvailableVoices] = useState([]); // State for fetched voices
  const [selectedVoice, setSelectedVoice] = useState(); // State for selected voice

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/french/frtags?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }); // Replace with your API endpoint
      const data = await res.json();
      if (data.success) {
        setAvailableTags(data.tags); // Assuming the API returns tags in this format
      } else {
        setError(data.error || "Failed to fetch tags");
      }
    } catch (err) {
      console.error("Error fetching tags:", err);
      setError("Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  // Fetch words from the backend
  const fetchWords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/french/frword?userId=${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }); // Replace with your API endpoint
      const data = await res.json();
      if (data.success) {
        setWords(data.words); // Assuming the API returns words in this format
      } else {
        setError(data.error || "Failed to fetch words");
      }
    } catch (err) {
      console.error("Error fetching words:", err);
      setError("Failed to fetch words");
    } finally {
      setLoading(false);
    }
  };

  const fetchVoices = async () => {
    try {
      const res = await fetch("/api/polly?language=fr-FR"); // Replace with your API endpoint
      const data = await res.json();
      if (res.ok) {
        setAvailableVoices(data); // Assuming the API returns voices in this format
         if (!selectedVoice && data.length > 0) {
        setSelectedVoice(data[0].id); // set default voice to the first pt-BR voice
      }
      } else {
        setError(data.error || "Failed to fetch voices");
      }
    } catch (err) {
      console.error("Error fetching voices:", err);
      setError("Failed to fetch voices");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTags();
      fetchWords();
      fetchVoices();
    }
  }, [userId]); // Ensure this runs only when `userId` changes

  return (
    <>
      <FilterCard
        tags={availableTags}
        voices={availableVoices}
        onVoiceChange={setSelectedVoice} // Pass the voice change handler
      />
      <Table words={words} loading={loading} selectedVoice={selectedVoice} />
    </>
  );
};

export default PageWithFilters;