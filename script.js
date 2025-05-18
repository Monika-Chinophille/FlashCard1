// Define keyword rules for subject inference
const subjectKeywords = {
  "Biology": ["photosynthesis", "cell", "genetics", "evolution", "biology"],
  "Physics": ["force", "motion", "energy", "velocity", "physics"],
  "Chemistry": ["atom", "molecule", "reaction", "chemistry", "acid"],
  "Mathematics": ["derivative", "integral", "equation", "algebra", "geometry"],
  "History": ["war", "revolution", "history", "empire", "treaty"],
  "Geography": ["country", "capital", "mountain", "river", "geography"]
};

// Function to infer subject based on question text
function inferSubject(question) {
  const qLower = question.toLowerCase();
  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    for (const keyword of keywords) {
      if (qLower.includes(keyword)) {
        return subject;
      }
    }
  }
  return "Unknown"; // default if no keywords match
}

// Function to save flashcard to localStorage
function saveFlashcard(flashcard) {
  let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.push(flashcard);
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// Function to display stored flashcards
function displayFlashcards() {
  const flashcardsDiv = document.getElementById('flashcardsList');
  flashcardsDiv.innerHTML = '';
  const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flashcard';
    cardDiv.innerHTML = `
      <h3>Question:</h3><p>${card.question}</p>
      <h3>Answer:</h3><p>${card.answer}</p>
      <p><strong>Subject:</strong> ${card.subject}</p>
      <p><strong>Student ID:</strong> ${card.student_id}</p>
    `;
    flashcardsDiv.appendChild(cardDiv);
  });
}

// Handle form submission
document.getElementById('flashcardForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const studentId = document.getElementById('studentId').value.trim();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  // Infer subject
  const subject = inferSubject(question);

  const flashcard = {
    student_id: studentId,
    question: question,
    answer: answer,
    subject: subject
  };

  saveFlashcard(flashcard);

  // Show success message
  const messageDiv = document.getElementById('message');
  messageDiv.style.color = 'green';
  messageDiv.textContent = `Flashcard added! Subject inferred: ${subject}`;

  // Reset form
  document.getElementById('flashcardForm').reset();

  // Update flashcards display
  displayFlashcards();
});

// Initialize display on page load
window.onload = function() {
  displayFlashcards();
};