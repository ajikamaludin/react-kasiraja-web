export default function Detail(props) {
  const id = props.match.params.id

  return (
    <div>Product: { id }</div>
  )
}