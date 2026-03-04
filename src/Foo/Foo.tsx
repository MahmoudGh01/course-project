import { useParams } from "react-router"

const Foo: React.FC = () => {
  const { slug } = useParams()

  return <div>Foo {slug}</div>
}

export default Foo
