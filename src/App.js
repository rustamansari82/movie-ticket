import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Card, Tag, Divider } from "antd";

const { Meta } = Card;

export default function App() {
  const [dataSource, setDataSource] = useState(null);
  const [selectedData, setSElectedData] = useState(null);

  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await response.json();

      setDataSource(data);
    }
  }, []);

  if (selectedData) {
    return (
      <DetailsPage data={selectedData} goBack={() => setSElectedData(null)} />
    );
  }

  return (
    <div className="App">
      <Table
        dataSource={dataSource}
        columns={[
          ...columns,
          {
            title: "View Detaild",
            dataIndex: "show",
            key: "averageRuntime",
            render: (_, data) => (
              <Button onClick={() => setSElectedData(data)} type="link">
                View
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}

const columns = [
  {
    title: "Image",
    dataIndex: "show",
    key: "show",
    render: (show) => <img height={70} width={70} src={show?.image?.medium} />,
  },
  { title: "Score", dataIndex: "score", key: "score" },
  {
    title: "Runtime",
    dataIndex: "show",
    key: "runtime",
    render: (show) => show?.runtime,
  },
  {
    title: "Average Runtime",
    dataIndex: "show",
    key: "averageRuntime",
    render: (show) => show?.averageRuntime,
  },
];

function DetailsPage({ data, goBack }) {
  return (
    <>
      <DisplayDetails data={data} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Button onClick={goBack}>GO BACK</Button>
      </div>
    </>
  );
}

const DisplayDetails = ({ data }) => {
  const {
    name,
    type,
    language,
    genres,
    status,
    runtime,
    premiered,
    ended,
    officialSite,
    summary,
  } = data.show;
  const { name: networkName, country } = data.show.network;
  const { medium: imageMedium } = data.show.image;
  const imdbLink = `https://www.imdb.com/title/${data.show.externals.imdb}`;

  return (
    <Card className="show-details">
      <img src={imageMedium} alt={name} className="show-image" />
      <Meta title={name} description={type} />
      <Divider />

      <p>Language: {language}</p>
      <p>Status: {status}</p>
      <p>Runtime: {runtime} minutes</p>
      <p>Premiered: {premiered}</p>
      <p>Ended: {ended}</p>
      {officialSite && (
        <p>
          Official Site:{" "}
          <a href={officialSite} target="_blank" rel="noopener noreferrer">
            {officialSite}
          </a>
        </p>
      )}
      <p>
        Network: {networkName} ({country.name}, {country.timezone})
      </p>
      <p>
        Genres:{" "}
        {genres.map((genre) => (
          <Tag key={genre}>{genre}</Tag>
        ))}
      </p>
      <p>
        IMDb:{" "}
        <a href={imdbLink} target="_blank" rel="noopener noreferrer">
          {imdbLink}
        </a>
      </p>
      <Divider />

      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </Card>
  );
};

// const DisplayDetails = ({ data }) => {
//   const { name, type, language, genres, status, runtime, premiered, ended, officialSite, summary } = data.show;
//   const { name: networkName, country } = data.show.network;
//   const { medium: imageMedium } = data.show.image;
//   const imdbLink = `https://www.imdb.com/title/${data.show.externals.imdb}`;

//   return (
//     <div className="show-details">
//       <img src={imageMedium} alt={name} />
//       <h1>{name}</h1>
//       <p>Type: {type}</p>
//       <p>Language: {language}</p>
//       <p>Genres: {genres.join(', ')}</p>
//       <p>Status: {status}</p>
//       <p>Runtime: {runtime} minutes</p>
//       <p>Premiered: {premiered}</p>
//       <p>Ended: {ended}</p>
//       {officialSite && <p>Official Site: <a href={officialSite} target="_blank" rel="noopener noreferrer">{officialSite}</a></p>}
//       <p>Network: {networkName} ({country.name}, {country.timezone})</p>
//       <p>IMDb: <a href={imdbLink} target="_blank" rel="noopener noreferrer">{imdbLink}</a></p>
//       <div dangerouslySetInnerHTML={{ __html: summary }} />
//     </div>
//   );
// };
