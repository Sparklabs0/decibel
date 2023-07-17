import Layout from "@/custom-components/Layout";
import React, { ReactElement } from "react";

function AudioFiles() {
  return <div>Audio Files</div>;
}

AudioFiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AudioFiles;
