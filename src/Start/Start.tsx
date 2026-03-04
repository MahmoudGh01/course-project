const Start: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <>
      <button onClick={() => onStart()}>Begin</button>
    </>
  )
}

export default Start
