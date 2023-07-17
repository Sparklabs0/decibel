import Layout from "@/custom-components/Layout";
import React, { ReactElement } from "react";

function NewNotes() {
  return <div>New Notes</div>;
}

NewNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewNotes;
