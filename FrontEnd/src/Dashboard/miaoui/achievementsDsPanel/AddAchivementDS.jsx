import DefaultLayout from "../../src/layout/DefaultLayout";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { addAchivementAndAssaignToAllTeams } from "../../../redux/slice/achievementSlice";
import Alert from "react-bootstrap/Alert";

const AddAchivementDS = () => {
  const dispatch = useDispatch();

  //Alerts
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailure, setsubmitFailure] = useState(false);

  const achievementTypes = [
    "TOURNEMENT_RANK_1",
    "TOURNEMENT_RANK_2",
    "TOURNEMENT_RANK_3",
    "GAME",
    "GOAL",
    "WIN",
    "LOSE",
    "DRAW",
  ];
  const rewardOptions = [
    "NOTHING",
    "DISCOUNT_10%",
    "DISCOUNT_20%",
    "DISCOUNT_30%",
  ];

  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Icon, setIcon] = useState(null);
  const [MileStone, setMileStone] = useState("");
  const [Type, setType] = useState("");
  const [Reward, setReward] = useState("");

  const [selectedOptionType, setSelectedOptionType] = useState("");
  const [selectedOptionReward, setSelectedOptionReward] = useState("");

  const [nameError, setNameError] = useState("Achievement Name is Required");
  const [descriptionError, setDescriptionError] = useState(
    "Achievement Description is Required"
  );
  const [milestoneError, setMileStoneError] = useState(
    "Achievement MileStone is Required"
  );
  const [typeError, setTypeError] = useState("Achievement Type is Required");
  const [rewardError, setRewardError] = useState(
    "Achievement Reward is Required"
  );

  // Event Handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value.trim()) {
      setNameError("Achievement Name is required");
    } else if (value.trim().length <= 3) {
      setNameError("Achievement Name must be at least 4 characters");
    } else {
      setNameError(null);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (!value.trim()) {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError(null);
    }
  };

  const handleMilestoneChange = (e) => {
    const value = e.target.value;
    setMileStone(value);
    if (!value.trim()) {
      setMileStoneError("Milestone is required");
    }
    if (value.trim() < 0) {
      setMileStoneError("Milestone must be positive");
    } else {
      setMileStoneError(null);
    }
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedOptionType(value);
    setType(value);
    setTypeError(value ? null : "Type is required");
  };

  const handleRewardChange = (e) => {
    const value = e.target.value;
    setSelectedOptionReward(value);
    setReward(value);
    setRewardError(value ? null : "Reward is required");
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIcon(file); // assuming Icon is a File object
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload on form submit
    if (
      !nameError &&
      !descriptionError &&
      !milestoneError &&
      !typeError &&
      !rewardError
    ) {
      const achievement = {
        name: Name,
        desc: Description,
        icon: "Icon",
        ms: MileStone,
        type: Type,
        reward: Reward,
      };

      dispatch(addAchivementAndAssaignToAllTeams(achievement))
        .then((result) => {
          if (result.payload.status === true) {
            setSubmitSuccess(true);
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 3000);
          } else {
            setsubmitFailure(true);
            setTimeout(() => {
              setsubmitFailure(false);
            }, 3000);
          }
        })
        .catch((error) => {
          setsubmitFailure(true);
          setTimeout(() => {
            setsubmitFailure(false);
          }, 3000);
        });
    } else {
      setsubmitFailure(true);
      setTimeout(() => {
        setsubmitFailure(false);
      }, 3000);
    }
  };

  return (
    <DefaultLayout>
      {/* sucess msg when academy created "condional or Failure in iput" */}
      <div>
        {(submitSuccess && (
          <Alert className="alertModified" variant="success">
            Achievement added successfully!
          </Alert>
        )) ||
          (submitFailure && (
            <Alert variant="danger">You Must Enter Valid Data!</Alert>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* Achievement Name */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Achievement
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Achievement Name
                  </label>
                  <input
                    type="text"
                    placeholder="Add Achievement Name"
                    value={Name}
                    onChange={(e) => handleNameChange(e)}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      nameError ? "border-red-500" : ""
                    }`}
                  />
                  {nameError && <p className="text-red-500">{nameError}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Add Description"
                    value={Description}
                    onChange={(e) => handleDescriptionChange(e)}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      descriptionError ? "border-red-500" : ""
                    }`}
                  />
                  {descriptionError && (
                    <p className="text-red-500">{descriptionError}</p>
                  )}
                </div>
              </div>
              {/* Type Selector */}
              <div className="flex flex-col gap-5.5 p-6.5">
                <label className="mb-3 block text-black dark:text-white">
                  Type
                </label>
                <select
                  value={selectedOptionType}
                  onChange={(e) => handleTypeChange(e)}
                  className={`w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    typeError ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Type</option>
                  {achievementTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {typeError && <p className="text-red-500">{typeError}</p>}
              </div>

              {/* Icon Upload */}
              {/* <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Attach Icon
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleIconChange(e)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:border-0 file:border-r file:border-solid file:border-stroke file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* Milestone */}
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    MileStone
                  </label>
                  <input
                    type="number"
                    placeholder="Add Achievement Milestone"
                    value={MileStone}
                    onChange={(e) => handleMilestoneChange(e)}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      milestoneError ? "border-red-500" : ""
                    }`}
                  />
                  {milestoneError && (
                    <p className="text-red-500">{milestoneError}</p>
                  )}
                </div>
              </div>

              {/* Reward Selector */}
              <div className="flex flex-col gap-5.5 p-6.5">
                <label className="mb-3 block text-black dark:text-white">
                  Reward
                </label>
                <select
                  value={selectedOptionReward}
                  onChange={(e) => handleRewardChange(e)}
                  className={`w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    rewardError ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Reward</option>
                  {rewardOptions.map((reward) => (
                    <option key={reward} value={reward}>
                      {reward}
                    </option>
                  ))}
                </select>
                {rewardError && <p className="text-red-500">{rewardError}</p>}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary py-4 px-6 text-white transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add Achievement
            </button>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AddAchivementDS;
