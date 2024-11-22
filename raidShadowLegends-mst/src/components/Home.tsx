import mysteryshard from "../assets/shardImages/OIP-removebg-preview.png";
import ancientshard from "../assets/shardImages/ancient-removebg-preview.png";
import voidshard from "../assets/shardImages/OIP__1_-removebg-preview.png";
import sacredshard from "../assets/shardImages/OIP__2_-removebg-preview.png";
export default function Home() {
  return (
    <div className="home flex justify-center items-center top-0">
      <table>
        <tr className="flex gap-7">
          <td>Shard type</td>
          <td>Rarity</td>
          <td>Progress</td>
          <td>Summoned since rarity</td>
          <td>Summon chance</td>
        </tr>
        <tr className="flex gap-7">
          <td>
            <img src={mysteryshard} alt="" className="w-20 h-20" />
          </td>
          <td>Cell D</td>
          <td>Cell C</td>
          <td>Cell D</td>
          <td>Cell C</td>
        </tr>
        <tr className="flex gap-7">
          <td>
            <img src={ancientshard} alt="" className="w-20 h-20" />
          </td>
          <td>Cell D</td>
          <td>Cell C</td>
          <td>Cell D</td>
          <td>Cell C</td>
        </tr>
        <tr className="flex gap-7">
          <td>
            <img src={voidshard} alt="" className="w-20 h-20" />
          </td>
          <td>Cell D</td>
          <td>Cell C</td>
          <td>Cell D</td>
          <td>Cell C</td>
        </tr>
        <tr className="flex gap-7">
          <td>
            <img src={sacredshard} alt="" className="w-20 h-20" />
          </td>
          <td>Cell D</td>
          <td>Cell C</td>
          <td>Cell D</td>
          <td>Cell C</td>
        </tr>
      </table>
    </div>
  );
}
