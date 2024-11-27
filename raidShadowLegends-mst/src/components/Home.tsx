import { useEffect, useState } from "react";
import mysteryshard from "../assets/shardImages/OIP-removebg-preview.png";
import ancientshard from "../assets/shardImages/ancient-removebg-preview.png";
import voidshard from "../assets/shardImages/OIP__1_-removebg-preview.png";
import sacredshard from "../assets/shardImages/OIP__2_-removebg-preview.png";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Home() {
  const [initialShardDataFirebase, setInitialShardDataFirebase] = useState<
    any[]
  >([]);
  const shardCollectionRef = collection(db, "shardData");
  useEffect(() => {
    const getShard = async () => {
      try {
        const data = await getDocs(shardCollectionRef);
        const filteredData: any[] = data.docs.map((doc) => {
          const shard = doc.data();
          return {
            ...shard,
            id: doc.id,
            // Transform `summoned` object to array
            summoned: shard.rarity.map((r: string) => shard.summoned[r] || 0),
            summonedChance: shard.rarity.map(
              (r: string) => shard.summonedChance[r] || 0
            ),
            relativePercent: shard.rarity.map(
              (r: string) => shard.relativePercent[r] || 0
            ),
            colors: shard.rarity.map((r: string) => shard.colors[r]),
            mercyCount: shard.mercyCount, // Retain original mercyCount structure
          };
        });
        console.log(filteredData);
        setInitialShardDataFirebase(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getShard();
  }, []);

  const [shardData, setShardData] = useState(initialShardDataFirebase);
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
              ?.rarity.map((rarity: any, index: number) => (
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
            {initialShardDataFirebase.map((shard, index) => (
              <tr key={index}>
                <td>
                  {shard.name === "ancientShard" ? (
                    <img
                      src={ancientshard}
                      alt="Ancient Shard Image"
                      className="shard-img"
                    />
                  ) : shard.name === "mysteryShard" ? (
                    <img
                      src={mysteryshard}
                      alt="Mystery Shard Image"
                      className="shard-img"
                    />
                  ) : shard.name === "voidShard" ? (
                    <img
                      src={voidshard}
                      alt="Void Shard Image"
                      className="shard-img"
                    />
                  ) : shard.name === "sacredShard" ? (
                    <img
                      src={sacredshard}
                      alt="Sacred Shard Image"
                      className="shard-img"
                    />
                  ) : (
                    <span>Unknown Shard</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.rarity.map((rarity: string[], idx: number) => (
                      <span key={idx}>{rarity}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="progress-container">
                    {shard.rarity.map((rarity: string[], idx: number) => (
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
                    {shard.summoned.map((count: number, idx: number) => (
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
                    {shard.summonedChance.map((count: number, idx: number) => (
                      <span key={idx}>{count}%</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.relativePercent.map((count: number, idx: number) => {
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
                        return <span key={idx}>{count}%</span>;
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
