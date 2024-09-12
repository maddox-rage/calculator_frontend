import Layout from "../../layout/Layout";
import EmptyState from "../../ui/EmptyState";

const Calculator = () => {
  return (
    <Layout>
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
        calculator
      </div>
    </Layout>
  );
};
export default Calculator;
