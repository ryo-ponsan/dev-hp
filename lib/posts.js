// APIにフェッチするための関数
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// apiにfetchを使ってアクセスする関数
export async function getAllPostsData(){
    // asyncとawaitで同期、エンドポイントからデータを取ってくるまで待ちresに結果
    const res = await fetch(new URL(apiUrl));
    // jsonの形式に変換
    const posts = await res.json();
    return posts;
}

// apiにfetchを使いアクセスし、map関数でidだけ抽出する関数。idを使って、のちほどgetStaticPropsで個別データの抽出する
export async function getAllPostIds(){
    const res = await fetch(new URL(apiUrl));
    const posts = await res.json();

    // idだけ取出し、idの一覧データを生成。getStaticPathsではフィールド名に必ずparamsをつけないといけない。
    return posts.map((post)=>{
        return{
            params:{
                id: String(post.id),
            },
        };
    });
}

// idを取得してデータベースからデータを取得するための関数
export async function getPostData(id){
    const res = await fetch(new URL(`${apiUrl}/${id}/`))
    const post = await res.json();

    return post;
}