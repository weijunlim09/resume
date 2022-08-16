import { useRouter } from "next/router";

const ExperienceId = () => {
  const router = useRouter();

  const { experienceId } = router.query;
  console.log(experienceId);
  return (
    <>
      <div>ExperienceId</div>
    </>
  );
};

export default ExperienceId;
