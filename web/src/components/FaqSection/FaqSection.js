import { useState } from 'react'

const FAQ_CONFIG = [
  {
    question: 'What is Treasure Chess?',
    answer:
      'Treasure Chess is an app that lets you save, collect, trade, and marvel at unique games of chess by saving them as NFTs. Each token represents a completely unique game, no two can represent the same sequence of moves, and its other attributes are a reflection of those particular moves.',
  },
  {
    question: 'What are NFTs?',
    answer:
      'TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN!',
  },
  {
    question: 'What is a wallet?',
    answer:
      'TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN!',
  },
  {
    question: 'How do I see my tokens?',
    answer:
      'TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN!',
  },
  {
    question: 'How do I transfer my Treasure Chess token to someone else?',
    answer:
      'TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN!',
  },
  {
    question: 'How do I mint a new game on Treasure Chess?',
    answer:
      'TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN! TO FILL IN!',
  },
]

const FaqItem = ({ question, answer }) => {
  const [isExpanded, setExpanded] = useState(false)
  return (
    <div className="pb-20">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold question-heading">{question}</h3>
        <button
          onClick={() => setExpanded(!isExpanded)}
          className="section-expand-button text-2xl font-bold"
          style={{
            color: isExpanded ? 'yellow' : 'green',
          }}
        >
          [{isExpanded ? '-' : '+'}]
        </button>
      </div>
      <p
        className="answer-container text-xl font-semibold mt-10"
        style={{
          // 500 is arbitrarily large
          maxHeight: isExpanded ? 400 : 0,
          opacity: isExpanded ? 1 : 0,
        }}
      >
        {answer}
      </p>
    </div>
  )
}

const FaqSection = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-header font-black text-5xl py-20">FAQs</h2>
      {FAQ_CONFIG.map((item, idx) => (
        <FaqItem key={idx} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default FaqSection
