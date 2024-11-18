import Image from "next/image";
import FundingStatus from "@/app/(_components)/funding-status";
import PayNotice from "./(components)/pay-notice";
import BadgeStatus from "./(components)/badge-status";
import GoCardBenefit from "./(components)/go-card-benefit";
import PointMoney from "./(components)/point-money";
import { PATH } from "@/lib/_shared/paths";
import Link from "next/link";

export default function HomePage() {
  // TODO: 실제 데이터 fetching
  return (
    <div className="flex flex-col gap-5">
      {/** 알림 */}
      <PayNotice />

      {/** 포인트, 머니 */}
      <PointMoney />

      {/** 펀딩 현황 */}
      <div className="card">
        <FundingStatus />
      </div>

      {/** 획득 배지 및 펀딩 */}
      <BadgeStatus />

      {/** 더 큰 혜택 찾기 */}
      <GoCardBenefit />

      {/** 카드 추가하기 */}

      <Link
        href={PATH.CHAT}
        className="fixed bottom-4 right-4  bg-shadow-600 rounded-full p-3"
      >
        <Image width={32} height={32} src="/icons/chat.svg" alt="채팅" />
      </Link>
    </div>
  );
}
