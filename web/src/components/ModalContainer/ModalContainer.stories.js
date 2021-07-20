import ModalContainer from './ModalContainer'

export const generated = () => {
  return (
    <div
      // Simulating a mobile device
      style={{
        width: '100%',
        height: 800,
        overflowY: 'scroll',
        border: '1px solid #fff',
        borderRadius: 10,
        position: 'relative',
      }}
    >
      <ModalContainer
        title="Mint Game"
        onClose={() => console.log('CLOSED MODAL')}
        stepNum={1}
        totalNumSteps={2}
        statusText="Processing"
      >
        ModalContainer content
        <button className="rect-button green">Modal content button</button>
      </ModalContainer>
      <div style={{ paddingTop: 100 }}>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
      </div>
    </div>
  )
}

export default { title: 'Components/ModalContainer' }
