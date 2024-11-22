import mysteryshard from "../assets/shardImages/OIP-removebg-preview.png";
import ancientshard from "../assets/shardImages/ancient-removebg-preview.png";
import voidshard from "../assets/shardImages/OIP__1_-removebg-preview.png";
import sacredshard from "../assets/shardImages/OIP__2_-removebg-preview.png";

export default function Home() {
  // Sample data (summoned since rarity, mercy count, and fill colors)
  const shardData = [
    {
      img: mysteryshard,
      name: "Mystery Shard",
      rarity: ["Common", "Uncommon", "Rare"],
      summoned: [0, 21, 19],
      summonChance: ["89.5%", "10%", "0.5%"],
      mercyCount: 200,
      colors: ["#2563eb", "#6b7280", "#10b981"], // blue, gray, green
    },
    {
      img: ancientshard,
      name: "Ancient Shard",
      rarity: ["Rare", "Epic", "Legendary"],
      summoned: [0, 21, 19],
      summonChance: ["89.5%", "10%", "0.5%"],
      mercyCount: 200,
      colors: ["#2563eb", "#8b5cf6", "#f59e0b"], // blue, purple, yellow
    },
    {
      img: voidshard,
      name: "Void Shard",
      rarity: ["Rare", "Epic", "Legendary"],
      summoned: [0, 21, 19],
      summonChance: ["91.5%", "8%", "0.5%"],
      mercyCount: 200,
      colors: ["#2563eb", "#8b5cf6", "#f59e0b"], // blue, purple, yellow
    },
    {
      img: sacredshard,
      name: "Sacred Shard",
      rarity: ["Epic", "Legendary"],
      summoned: [21, 19],
      summonChance: ["94%", "6%"],
      mercyCount: 200,
      colors: ["#8b5cf6", "#f59e0b"], // purple, yellow
    },
  ];

  return (
    <div className="home flex justify-center items-center">
      <div className="table-container shadow-lg rounded-lg overflow-hidden">
        <table className="shard-table">
          <thead>
            <tr>
              <th>Shard Type</th>
              <th>Rarity</th>
              <th>Progress</th>
              <th>Summoned Since Rarity</th>
              <th>Summon Chance</th>
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
                              (shard.summoned[idx] / shard.mercyCount) * 100
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
                      <span key={idx}>{count}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    {shard.summonChance.map((chance, idx) => (
                      <span key={idx}>{chance}</span>
                    ))}
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
