import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectHead from "../components/project/Project_head.js";
import ProjectContent from "../components/project/project_content.js";
import ProjectMore from "../components/project/project_more.js";

import { fetchListRelative, fetchProjectFullDetailForm } from "../actions";
import { selectListRelative } from "../reducers/explore.reducer";
import { selectFullDetailForm } from "../reducers/project.reducer";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const listRelative = useSelector(selectListRelative);
  const fullDetailForm = useSelector(selectFullDetailForm);

  useEffect(() => {
    dispatch(
      fetchListRelative({
        type: "project",
      })
    );

    dispatch(fetchProjectFullDetailForm(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className="box-borrows w-full mx-auto bg-cover pt-12 bg-center inline-block bg-[#0D0F20]">
      <div>
        {fullDetailForm &&
          fullDetailForm?.items &&
          Object.keys(fullDetailForm?.items).length && (
            <ProjectHead fullDetailForm={fullDetailForm} />
          )}

        <ProjectContent />
        {listRelative && listRelative?.items && (
          <ProjectMore data={listRelative?.items} />
        )}
      </div>
    </section>
  );
};

export default ProjectPage;
