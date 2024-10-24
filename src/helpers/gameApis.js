import { backendUrl } from "../socket/socket";

export const getScenario = async (id) => {
  return await fetch(`${backendUrl}scenario?id=${id}`)
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((data) => data);
};

export const evalScenario = async (scenario, answer, yourId) => {
  const body = {
    scenario,
    answer,
    yourId,
  };

  console.log("body >>>", JSON.stringify(body));

  return await fetch(`${backendUrl}evaluate-scenario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((result) => result.json())
    .then((data) => data);
};
