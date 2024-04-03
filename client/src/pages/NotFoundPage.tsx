import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return (
        <div className="hero min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Page not found!</h1>
      <h1 className="text-6xl mt-5">🫠</h1>
      <Link to="/" className="btn mt-5">Home</Link>
    </div>
  </div>
</div>
    )
}