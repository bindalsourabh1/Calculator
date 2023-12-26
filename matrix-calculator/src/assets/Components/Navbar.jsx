function Navbar() {
  return (
    <div className="navbar-container text-center bg-stone-500 text-white py-2 border-black">
      <h1 className="text-4xl font-bold mb-4">
        Matrix Multiplication Calculator
      </h1>
      <p className="text-lg">
        <strong className="text-yellow-400">Instructions:</strong> Input the
        size of the matrix, then input the values of the matrix. The matrix size
        must be a number greater than 0. The matrix values can be any number.
      </p>
    </div>
  );
}

export default Navbar;
