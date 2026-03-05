import profile from "../assets/profile.jpg"

export default function About() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">About Me</h1>
      <p className="mt-2">
        Hello, I am a college freshman from Pleasanton, California, studying Computer Science at UC Irvine. 
        I have a strong foundation in software engineering, data science, and machine learning, and I’m motivated by technologies that help people while 
        also improving performance, reliability, and data integrity. My experience includes developing an AI misinformation detection model with 92.3% accuracy 
        using natural language processing and logistic regression, as well as building production-ready features in React during my internship at Hey, Blue!, where 
        I worked on authentication and data-handling systems. I have led and contributed to multiple technical projects involving data pipelines, algorithmic 
        optimization, and user-focused tools, including AI-driven systems for personalized learning and knowledge retrieval. Through leadership roles in Computer 
        Science and Robotics clubs, I’ve gained experience solving complex problems collaboratively and applying computer science principles to real-world challenges. 
        Outside of tech, you’ll usually find me playing tennis or soccer, working out, traveling, or exploring mythology and good food.
      </p>
      <img src={profile} alt="Picture of me" />
    </main>
  );
}