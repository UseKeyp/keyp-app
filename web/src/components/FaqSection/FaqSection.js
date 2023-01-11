const FaqItem = ({ icon, question, answer }) => {
  return (
    <div className="question-wrapper">
      <div className="piece" />
      <div className="mb-2">
        {icon ? <div className="text-lg">{icon}</div> : <></>}
        <div className="flex justify-between">
          <h2 className="">{question}</h2>
        </div>
      </div>
      <div className="answer-container text-base">{answer}</div>
    </div>
  )
}

const FaqSection = ({ title, questionList }) => {
  return (
    <div className="flex justify-center">
      <div>
        {title && (
          <h2 className="faq-header font-black text-4xl py-5">{title}</h2>
        )}
        <div className="faq-container max-w-2xl">
          {questionList?.map((item, idx) => (
            <FaqItem
              key={idx}
              icon={item[2]}
              question={item[0]}
              answer={item[1]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqSection
