import Image from "next/image";
import foo from "/public/images/pumpkins-7469993_1920.jpg";

export default function About() {
  return (
    <>
      <h1>about</h1>
      <h3>about...</h3>
      <Image
        src="/images/pumpkin-2594747_1920.jpg"
        alt="pumkin"
        width={500}
        height={500}
      />
      <Image src={foo} alt="pumkins" layout="responsive" />
      {/* 외부 이미지 출력 */}
      <Image
        src="https://cdn.pixabay.com/photo/2022/01/05/00/13/spiderweb-6916188_640.jpg"
        alt="spiderweb-640"
        width={500}
        height={500}
      />
      <Image
        src="https://cdn.pixabay.com/photo/2022/01/05/00/13/spiderweb-6916188_1280.jpg"
        alt="spiderweb-1280"
        width={500}
        height={500}
      />
    </>
  );
}
