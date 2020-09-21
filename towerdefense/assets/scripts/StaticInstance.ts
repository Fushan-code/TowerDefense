import MonsterBuild from "./game/MonsterBuild";
import MstItem from "./game/MstItem";
import Main from "./Main";
import BlockMap from "./ui/BlockMap";

export class StaticInstance{
    static blockMap:BlockMap=null;
    static main:Main=null;
    static monsterBuild:MonsterBuild=null;
    static mstItem:MstItem=null;
}