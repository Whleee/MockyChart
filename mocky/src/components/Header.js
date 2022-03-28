const RenderInfo = () => {
  return (
    <div>
      <div className="font-semibold text-white text-3xl">Plan Projection</div>
      <div className="font-medium text-white text-xl mt-5">
        This is an illustration of your plan and our recommendation based on
        your input. We ran 1,000 simulations to determine your range of possible
        outcomes at any point in the future net of all fees.
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="grid grid-flow-row mt-10 gap-y-5">
      <RenderInfo />
    </div>
  );
};

export default Header;
