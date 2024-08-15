import { motion } from "framer-motion";
import { v4 } from "uuid";

const GamesLoading = ({ count = 1, size, variant, className }) => {
  let containerClasses = `flex gap-3 p-4 rounded-lg ${className} `;

  const loadingElements = [];

  for (let i = 0; i < count; i++)
    loadingElements.push(
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
        className={containerClasses}
        key={v4()}
      >
        <div
          className={`relative overflow-hidden rounded bg-gray-200 ${
            size == "lg" ? "w-48 h-24" : "w-16"
          } p-4`}
        >
          <motion.div
            animate={{ x: [-200, 200] }}
            transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
            className="rounded"
            style={{
              boxShadow: "0 0 32px 32px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <div className="w-full">
          <div
            className={`relative overflow-hidden bg-gray-200 rounded-lg w-1/2 py-1 mb-2`}
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
              className="rounded-full"
              style={{
                boxShadow: "0 0 32px 32px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
          <div
            className={`relative overflow-hidden bg-gray-200 rounded-lg w-1/3 py-1 ${
              size == "lg" && "mb-2"
            }`}
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
              className="rounded-full"
              style={{
                boxShadow: "0 0 32px 32px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
          {size == "lg" && (
            <div
              className={`relative overflow-hidden bg-gray-200 rounded-lg w-1/3 py-1`}
            >
              <motion.div
                animate={{ x: [-200, 200] }}
                transition={{
                  ease: "easeInOut",
                  duration: 1,
                  repeat: Infinity,
                }}
                className="rounded-full"
                style={{
                  boxShadow: "0 0 32px 32px rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    );

  return loadingElements;
};

export default GamesLoading;
