import { collection,doc, deleteDoc, onSnapshot , query,where , getDocs ,} from "firebase/firestore";
import React, {useEffect,useState} from "react";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
const Home = ({setActive , user}) => {
  const [loading, setLoading] = useState(true);
  const [blogs,setBlogs]=useState([]);
  const [ tags , setTags]=useState([]);
  const [ trendBlogs , setTrendBlogs]=useState([]);


  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending","==","yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({id: doc.id, ...doc.data()
      })
    });
    setTrendBlogs(trendBlogs);
  }

  useEffect(()=> {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db,"blogs"),
      (snapshot) => {
         let list =[];
         let tags =[];
         snapshot.docs.forEach((doc) => {
          list.push({id: doc.id ,...doc.data()});
          tags.push(...doc.get("tags"));


          
         });
         const uniqueTags = [...new Set(tags)];
         setTags(uniqueTags);
         setBlogs(list);
         setLoading(false);
         setActive("home");
        },(error) => {
          console.log(error);
        }
      
    );
    return () =>{
      unsub();
      getTrendingBlogs();
    };
  } , [setActive]);
  if(loading) {
    return <Spinner />;

  }
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure wanted to delete that blog ?")){
      try{
        setLoading(true);
        await deleteDoc(doc(db, "blogs",id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  return (
    <div className="conatiner-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-8">
          <Trending blogs={trendBlogs} />
          <div className="col-md-8">
            <BlogSection 
            blogs={blogs} 
            user={user}
            handleDelete={handleDelete}
            />
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            < MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  )

};
export default Home;