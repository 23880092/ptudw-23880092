import { useEffect } from "react";
import Layout from "./components/layout";
import { Route } from "react-router-dom";
import RoutesDef from "./RoutesDef.jsx";

function App() {
  useEffect(() => {
    //nap main.js sau khi react da tao Vitual DOM
    const script = document.createElement("script");
    script.src = "/js/main.js";
    script.async = false; // Đảm bảo script được thực thi theo thứ tự
    document.body.appendChild(script);

    return () => {
      // don dep script khi unmount component
      document.body.removeChild(script);
    };
  }, []);

  return <Layout>
    <RoutesDef /> 
  </Layout>;
  
}

export default App;
