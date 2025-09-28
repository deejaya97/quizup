import { Routes, Route } from "react-router-dom";
import TopicList from "./Components/Quiz/TopicList";
import Quiz from "./Components/Quiz/Quiz";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TopicList />} />
      <Route path="/quiz/:topic" element={<Quiz />} /> {/* topicId in URL */}
    </Routes>
  );
}