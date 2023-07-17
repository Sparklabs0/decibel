import Layout from "@/custom-components/Layout";
import React, { ReactElement } from "react";

function Notes() {
  return <div>Notes</div>;
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
