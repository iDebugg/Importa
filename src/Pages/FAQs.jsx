import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import RecentOrders from "../Components/RecentOrders";
import images from "../Assets/img/Write.svg";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [filter, setFilter] = useState("");

  const openEditModal = (faq) => {
    setCurrentFaq(faq);
    setIsModalOpen(true);
  };

  const handleSaveFaq = () => {
    if (currentFaq.id) {
      setFaqs(faqs.map((faq) => (faq.id === currentFaq.id ? currentFaq : faq)));
    } else {
      setFaqs([...faqs, { ...currentFaq, id: Date.now() }]);
    }
    setCurrentFaq(null);
    setIsModalOpen(false);
  };

  const handleSelectFaq = (faq) => {
    setSelectedFaq(faq);
  };

  const filteredFaqs = filter
    ? faqs.filter((faq) => faq.category === filter)
    : faqs;
  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden"></div>
      <main className=" md:ml-64 hidden sm:hidden md:block">
        <div className="bg-white p-5 display: flex justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-[#0A0500]">Dashboard</h1>
          </div>
          <div className="display: flex gap-3">
            <div>
              <button
                onClick={() => {
                  setCurrentFaq({ question: "", category: "", answers: [""] });
                  setIsModalOpen(true);
                }}
                className="bg-[#D9851F] text-white px-3 py-2 rounded-lg text-sm font-sanns"
              >
                <FontAwesomeIcon icon={faPlus} className="text-white mr-2" />
                New FAQ
              </button>
            </div>
            <div className="">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25H32C36.2802 0.25 39.75 3.71979 39.75 8V32C39.75 36.2802 36.2802 39.75 32 39.75H8C3.71979 39.75 0.25 36.2802 0.25 32V8Z"
                  stroke="#DFDFDE"
                  stroke-width="0.5"
                />
                <path
                  d="M15 16.6666C15 15.3405 15.5268 14.0688 16.4645 13.1311C17.4021 12.1934 18.6739 11.6666 20 11.6666C21.3261 11.6666 22.5979 12.1934 23.5355 13.1311C24.4732 14.0688 25 15.3405 25 16.6666C25 22.5 27.5 24.1666 27.5 24.1666H12.5C12.5 24.1666 15 22.5 15 16.6666Z"
                  stroke="#0A0500"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.583 27.5C18.7225 27.7537 18.9275 27.9653 19.1768 28.1127C19.426 28.26 19.7102 28.3378 19.9997 28.3378C20.2892 28.3378 20.5734 28.26 20.8226 28.1127C21.0718 27.9653 21.2769 27.7537 21.4163 27.5"
                  stroke="#0A0500"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-3xl">
              <FontAwesomeIcon icon={faCircle} className="text-[#608AC9]" />
            </div>
          </div>
        </div>
        <div className="flex p-4 h-[calc(100vh-85px)] ">
          <div className="w-2/3 p-4 bg-white  rounded-l-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                FAQs ({filteredFaqs.length})
              </h2>
              <div className="">
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                  className="px-1 py-2 border rounded-md"
                >
                  <option value="">Filter by </option>
                  <option value="Shipping & Logistics">Shipping</option>
                  <option value="Payments">Payments</option>
                </select>
              </div>
            </div>
            <ul className="space-y-4">
              {filteredFaqs.map((faq) => (
                <li
                  key={faq.id}
                  className="p-4 bg-white rounded-md shadow cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectFaq(faq)}
                >
                  {faq.question}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/3 p-4 border border-gray-300 rounded-r-lg">
            {selectedFaq ? (
              <div>
                <div className="flex justify-end">
                  <button
                    onClick={() => openEditModal(selectedFaq)}
                    className=" display: flex items-center gap-2 mt-4 mb-2 px-4 py-1 text-[#D9851F] border border-[#D9851F] rounded-md"
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 13.834H14"
                        stroke="#D9851F"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.9172 2.91449C11.1825 2.6491 11.5425 2.5 11.9178 2.5C12.2931 2.5 12.6531 2.6491 12.9185 2.91449C13.1839 3.17988 13.333 3.53983 13.333 3.91516C13.333 4.29048 13.1839 4.65043 12.9185 4.91582L4.91182 12.9232C4.75322 13.0818 4.55717 13.1978 4.34182 13.2605L2.42716 13.8192C2.36979 13.8359 2.30898 13.8369 2.25109 13.8221C2.19321 13.8072 2.14037 13.7771 2.09812 13.7349C2.05587 13.6926 2.02575 13.6398 2.01092 13.5819C1.99609 13.524 1.99709 13.4632 2.01382 13.4058L2.57249 11.4912C2.6353 11.276 2.75132 11.0802 2.90982 10.9218L10.9172 2.91449Z"
                        stroke="#D9851F"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Edit FAQ
                  </button>
                </div>
                <span className="text-sm font-light bg-[#EBEBEB] rounded-xl p-2 text-[#7B7875]">
                  {selectedFaq.category}
                </span>
                <h3 className="text-sm font-light text-[#0A0500] mb-2 mt-4">
                  {selectedFaq.question}
                </h3>
                <ul className="list-disc pl-5 text-sm font-light text-[#0A0500]">
                  {selectedFaq.answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">Click on a question to view more</p>
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">
                  {currentFaq.id ? "Edit FAQ" : "Create an FAQ"}
                </h2>
                <div className="space-y-4">
                  <div className="display flex flex-col gap-2">
                    <label htmlFor="">Question</label>
                    <input
                      type="text"
                      placeholder="Enter the question here"
                      className="w-full p-2 border rounded-md"
                      value={currentFaq.question}
                      onChange={(e) =>
                        setCurrentFaq({
                          ...currentFaq,
                          question: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="display flex flex-col gap-2">
                    <label htmlFor="">Category</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={currentFaq.category}
                      onChange={(e) =>
                        setCurrentFaq({
                          ...currentFaq,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select the question category</option>
                      <option value="Shipping & Logistics">
                        Shipping & Logistics
                      </option>
                      <option value="Payments">Payments</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="">Answers</label>
                    {currentFaq.answers.map((answer, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder={`Answer ${index + 1}`}
                          className="w-full p-2 border rounded-md"
                          value={answer}
                          onChange={(e) => {
                            const newAnswers = [...currentFaq.answers];
                            newAnswers[index] = e.target.value;
                            setCurrentFaq({
                              ...currentFaq,
                              answers: newAnswers,
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            const newAnswers = currentFaq.answers.filter(
                              (_, i) => i !== index
                            );
                            setCurrentFaq({
                              ...currentFaq,
                              answers: newAnswers,
                            });
                          }}
                          className="px-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentFaq({
                          ...currentFaq,
                          answers: [...currentFaq.answers, ""],
                        })
                      }
                      className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Add Answer
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={handleSaveFaq}
                    className="px-2 py-1 text-[#FDF4E9] text-sm bg-[#D9851F] rounded-md"
                  >
                    Publish question
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-2 py-2 border bg-[#F5F5F5] text-[#7B7875] text-sm rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default FAQs;
