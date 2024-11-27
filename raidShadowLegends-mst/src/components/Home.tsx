import { useEffect, useState } from "react";
import mysteryshard from "../assets/shardImages/OIP-removebg-preview.png";
import ancientshard from "../assets/shardImages/ancient-removebg-preview.png";
import voidshard from "../assets/shardImages/OIP__1_-removebg-preview.png";
import sacredshard from "../assets/shardImages/OIP__2_-removebg-preview.png";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home() {
  const [initialShardDataFirebase, setInitialShardDataFirebase] = useState({});
  const shardCollectionRef = collection(db, "shardData");
  useEffect(() => {
    const getShard = async () => {
      try {
        const data = await getDocs(shardCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getShard();
  }, []);
  const initialShardData = [
    {
      img: mysteryshard,
      name: "Mystery Shard",
      rarity: ["Common", "Uncommon", "Rare"],
      summoned: [0, 21, 19],
      summonChance: ["89.5%", "10%", "0.5%"],
      relativePercent: ["0", "0", "0"],
      mercyCount: 200,
      colors: ["#2563eb", "#6b7280", "#10b981"],
    },
    {
      img: ancientshard,
      name: "Ancient Shard",
      rarity: ["Rare", "Epic", "Legendary"],
      summoned: [0, 21, 19],
      summonChance: ["89.5%", "10%", "0.5%"],
      relativePercent: ["0", "0", "0"],
      mercyCount: 200,
      colors: ["#2563eb", "#8b5cf6", "#f59e0b"],
    },
    {
      img: voidshard,
      name: "Void Shard",
      rarity: ["Rare", "Epic", "Legendary"],
      summoned: [0, 21, 19],
      summonChance: ["91.5%", "8%", "0.5%"],
      relativePercent: ["0", "0", "0"],
      mercyCount: 200,
      colors: ["#2563eb", "#8b5cf6", "#f59e0b"],
    },
    {
      img: sacredshard,
      name: "Sacred Shard",
      rarity: ["Epic", "Legendary"],
      summoned: [5, 1],
      summonChance: ["94%", "6%"],
      relativePercent: ["0", "0"],
      mercyCount: 12,
      colors: ["#8b5cf6", "#f59e0b"],
    },
  ];

  const [shardData, setShardData] = useState(initialShardData);
  const [selectedShard, setSelectedShard] = useState("Sacred Shard");
  const [selectedRarity, setSelectedRarity] = useState(0);
  const [shardsOpened, setShardsOpened] = useState(1);

  const updateShardSummons = () => {
    setShardData((prevData) =>
      prevData.map((shard) => {
        if (shard.name === selectedShard) {
          const updatedSummoned = [...shard.summoned];
          updatedSummoned[selectedRarity] += shardsOpened;
          return { ...shard, summoned: updatedSummoned };
        }
        return shard;
      })
    );
  };
  return (
    <div className="home flex flex-col items-center">
      <div className="input-container my-4">
        <label>
          Select Shard Type:
          <select
            value={selectedShard}
            onChange={(e) => setSelectedShard(e.target.value)}
            className="ml-2"
          >
            {shardData.map((shard) => (
              <option key={shard.name} value={shard.name}>
                {shard.name}
              </option>
            ))}
          </select>
        </label>
        <label className="ml-4">
          Select Rarity:
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(Number(e.target.value))}
            className="ml-2"
          >
            {shardData
              .find((shard) => shard.name === selectedShard)
              ?.rarity.map((rarity, index) => (
                <option key={index} value={index}>
                  {rarity}
                </option>
              ))}
          </select>
        </label>
        <label className="ml-4">
          Shards Opened:
          <input
            type="number"
            value={shardsOpened}
            onChange={(e) => setShardsOpened(Number(e.target.value))}
            className="ml-2 w-16"
          />
        </label>
        <button
          onClick={updateShardSummons}
          className="b1 ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Update Summons
        </button>
      </div>
      <div className="table-container shadow-lg rounded-lg overflow-hidden">
        <table className="shard-table">
          <thead>
            <tr>
              <th>Shard Type</th>
              <th>Rarity</th>
              <th>Progress</th>
              <th>Summoned Since Rarity</th>
              <th>Summon Chance</th>
              <th>
                <span className="text-emerald-400">&#x21E7;</span>/
                <span className="text-red-400">&#x21e9;</span>Relative Percent
              </th>
            </tr>
          </thead>
          <tbody>
            {shardData.map((shard, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={shard.img}
                    alt={`${shard.name} Image`}
                    className="shard-img"
                  />
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.rarity.map((rarity, idx) => (
                      <span key={idx}>{rarity}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="progress-container">
                    {shard.rarity.map((rarity, idx) => (
                      <div key={idx} className="progress-bar-container">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${
                              shard.summoned[idx]! < shard.mercyCount
                                ? (shard.summoned[idx] / shard.mercyCount) * 100
                                : (shard.summoned[idx] / shard.summoned[idx]) *
                                  100
                            }%`,
                            backgroundColor: shard.colors[idx],
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.summoned.map((count, idx) => (
                      <div key={idx} className="flex justify-center">
                        <button className="clickingButtonsLeft">🞃</button>
                        <span className="text-lg ml-3 mr-3">{count}</span>
                        <button className="clickingButtonsRight">🞁</button>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.summonChance.map((count, idx) => (
                      <span key={idx}>{count}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.relativePercent.map((count, idx) => {
                      if (shard.summoned[idx] > shard.mercyCount) {
                        const chanceIncrease =
                          (Number(shard.summoned[idx]) - shard.mercyCount) * 2;
                        return (
                          <span key={idx}>
                            {count} + {chanceIncrease}%{" "}
                            <span className="text-emerald-400">&#x21E7;</span>
                          </span>
                        );
                      } else {
                        return <span key={idx}>{count}</span>;
                      }
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
