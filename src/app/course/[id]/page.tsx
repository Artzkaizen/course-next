const page = ({ params }: { params: { id: string } }) => {
  return <div className="font-bold">Course with id: {params.id}</div>;
};

export default page;
