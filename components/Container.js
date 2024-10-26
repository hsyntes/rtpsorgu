const Container = ({ className, children }) => (
  <div className={`container mx-auto px-4 ${className}`}>{children}</div>
);

export default Container;
