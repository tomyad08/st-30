import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Endpoints } from "../utils/endpoints";

const Result = () => {
  const [datas, setDatas] = useState("");
  const [select, setSelect] = useState("");
  const [transit, setTransit] = useState("");
  const [priority, setPriority] = useState("");
  const [norec, setNorec] = useState("");
  const location = useLocation();

  const ListNumber = (value) => {
    const colorValues = {
      RED: 50,
      YELLOW: 25,
    };

    const rumpunTotals = value.reduce((totals, item) => {
      const nilaiWarna = colorValues[item.color] || 0;
      totals[item.rumpun] = (totals[item.rumpun] || 0) + nilaiWarna;
      return totals;
    }, {});

    const sortedRumpun = Object.keys(rumpunTotals).sort(
      (a, b) => rumpunTotals[b] - rumpunTotals[a]
    );
    setPriority(sortedRumpun);
  };

  const NoRecomend = (value) => {
    const colorValues = {
      BLACK: 50,
    };

    const rumpunTotals = value.reduce((totals, item) => {
      const nilaiWarna = colorValues[item.color] || 0;
      totals[item.rumpun] = (totals[item.rumpun] || 0) + nilaiWarna;
      return totals;
    }, {});

    const sortedRumpun = Object.keys(rumpunTotals).sort(
      (a, b) => rumpunTotals[b] - rumpunTotals[a]
    );
    setNorec(sortedRumpun);
  };

  const ManageFunction = (data) => {
    setTransit(data);
    let res = [];
    let count = 0;
    for (let i = 0; i < location.state.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].strength.includes(location.state[i].nilai)) {
          count += 1;
          let x = {
            id: count,
            rumpun: data[j].rumpun,
            branding: location.state[i].nilai,
            color: location.state[i].color.split("-")[0].toUpperCase(),
            colorbg: `bg-${location.state[i].color}`,
            strong: location.state[i].strong,
          };
          res.push(x);
        }
      }
    }
    setDatas(res.sort((a, b) => a.rumpun.localeCompare(b.rumpun)));
    ListNumber(res);
    NoRecomend(res);
  };

  useEffect(() => {
    fetch(Endpoints.link, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => ManageFunction(data));
  }, [datas]);

  return (
    <div className="p-5 h-screen overflow-y-scroll bg-amber-100">
      <h1 className="text-center text-xl font-semibold">
        Hasil Prediksi Analisis
      </h1>
      {datas ? (
        <div>
          <div>
            <h1 className="font-semibold mt-5 mb-1">
              Rumpun yang di sarankan:
            </h1>
            <h1>1. {priority[0]}</h1>
            <h1>2. {priority[1]}</h1>
            <h1>3. {priority[2]}</h1>
            <h1>4. {priority[3]}</h1>
          </div>
          <div>
            <h1 className="font-semibold mt-5 mb-1">
              Rumpun yang tidak di sarankan:
            </h1>
            <h1>1. {norec[0]}</h1>
            <h1>2. {norec[1]}</h1>
            <h1>3. {norec[2]}</h1>
            <h1>4. {norec[3]}</h1>
          </div>
          <div className="flex justify-center py-4">
            <div>
              <h1>Silahkan Input Tujuan Rumpun Siswa</h1>
              <input
                className="p-2 w-full rounded-xl text-center bg-white focus:outline-none"
                placeholder="Dokter"
                onChange={(e) => setSelect(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h1 className="text-center font-semibold border-b-2 border-amber-700 my-3">
              Kebutuhan
            </h1>
            {transit
              .filter((value) => {
                if (select === "") {
                  return value;
                } else if (value.rumpun.includes(select.toUpperCase())) {
                  return value;
                }
              })
              .map((value) => (
                <div
                  className={`my-2 text-black p-2 rounded-lg`}
                  key={value.id}
                >
                  <div className="font-semibold mb-2">{value.rumpun}</div>
                  <div>{value.strength}</div>
                </div>
              ))}
          </div>

          <h1 className="text-center font-semibold border-b-2 border-amber-700 my-3">
            Kemampuan
          </h1>
          {datas
            .filter((value) => {
              if (select === "") {
                return value;
              } else if (value.rumpun.includes(select.toUpperCase())) {
                return value;
              }
            })
            .map((value) => (
              <div
                className={`my-2 flex justify-between ${value.colorbg} text-white p-2 rounded-lg`}
                key={value.id}
              >
                <div>{value.rumpun}</div>
                <div>{value.branding}</div>
                <div>{value.strong}</div>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Result;
