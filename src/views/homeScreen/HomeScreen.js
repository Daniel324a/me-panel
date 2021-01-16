import React from "react";

import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { AddForm } from "../../components/forms/AddForm";
import { OptionsBar } from "../../components/optionsBar/OptionsBar";
import { ProjectsTable } from "../../components/projectsTable/ProjectsTable";

const MySwal = withReactContent(Swal);

export const HomeScreen = () => {
  return (
    <div className="w-screen h-screen p-8 flex flex-col gap-5 bg-gray-200 dark:bg-gray-800">
      <OptionsBar />
      <ProjectsTable />
      <button
        data-tip
        data-for="addToolTip"
        className={`
            transition-all transform ease-in duration-150
            outline-none w-12 h-12 material-icons fixed bottom-5 right-5
            bg-blue-500 rounded-full text-white dark:text-gray-800
            hover:scale-95 hover:bg-blue-600 focus:outline-none
          `}
        onClick={() =>
          MySwal.fire({
            customClass: "dark:bg-gray-800",
            showConfirmButton: false,
            showCloseButton: true,
            html: <AddForm />,
          })
        }
      >
        add
      </button>

      <ReactTooltip
        id="addToolTip"
        place="left"
        effect="solid"
        delayShow={500}
        backgroundColor="#13131396"
        arrowColor="transparent"
      >
        Add project
      </ReactTooltip>
    </div>
  );
};
