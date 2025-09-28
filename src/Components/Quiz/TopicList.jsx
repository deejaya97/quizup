import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TopicList.css';

const topics = [
  { id: "chemistry", name: "Chemistry" },
  { id: "trivia", name: "Trivia" },
  { id: "biology", name: "Biology" },
  { id: "math", name: "Math" },
];

export default function TopicList() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  console.log("TopicList rendering");

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);           // highlight selected topic
    navigate(`/quiz/${topicId}`);        // navigate to quiz page
  };

  return (
    <div>
      <h1>QuizUp </h1>
      <div className="topic-list">
        {topics.map((t) => (
          <button
            key={t.id}
            className={`topic-item ${selectedTopic === t.id ? 'selected' : ''}`}
            onClick={() => handleTopicClick(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
