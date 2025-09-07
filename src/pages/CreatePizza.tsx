import { Outlet } from 'react-router-dom';

const CreatePizza = () => {
  return (
    <>
      {/* This is where nested routes (base, size, etc.) will render */}
      <Outlet />
    </>
  );
};

export default CreatePizza;