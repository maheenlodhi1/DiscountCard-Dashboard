import AppLayout from "@/layouts/AppLayout";
import { ReceiptPercentIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { LuCrown } from "react-icons/lu";
import OffersChart from "@/components/Charts/OffersChart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGraphData } from "@/features/graphs/graphApi";
import { useSelector } from "react-redux";
import {
  getCustomersGraph,
  getMembershipGraph,
  getOffersGraph,
  getPartnersGraph,
} from "@/features/graphs/graphSlice";
import { isEmptyObject } from "@/utils/generics";
import CustomersChart from "@/components/Charts/CustomersChart";
import MembershipsChart from "@/components/Charts/MembershipsChart";
import PartnerChart from "@/components/Charts/PartnersChart";

const stats = [
  { name: "Offers Listed", value: 0, icon: ReceiptPercentIcon },
  { name: "Customers Registered", value: 0, icon: UserGroupIcon },
  { name: "Partners Registered", value: 0, icon: UserGroupIcon },
  { name: "Membership Holders", value: 0, icon: LuCrown },
];

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState(stats);
  const dispatch = useDispatch();
  const offers = useSelector(getOffersGraph);
  const customers = useSelector(getCustomersGraph);
  const partners = useSelector(getPartnersGraph);
  const memberships = useSelector(getMembershipGraph);

  useEffect(() => {
    if (offers && customers && partners && memberships) {
      const updatedStats = [offers, customers, partners, memberships].map(
        (value, index) => {
          return { ...stats[index], value: value.count };
        }
      );
      setDashboardStats(updatedStats);
    }
  }, [offers, customers, partners, memberships]);

  useEffect(() => {
    dispatch(fetchGraphData());
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="">
        <div className="">
          <h3>Dashboard</h3>
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} item={stat} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="py-4 bg-white rounded-lg shadow-md">
            {!isEmptyObject(offers) && (
              <OffersChart offersSeries={offers.series} xaxis={offers.xaxis} />
            )}
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            {!isEmptyObject(customers) && (
              <CustomersChart
                customerSeries={customers.series}
                xaxis={customers.xaxis}
              />
            )}
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            {!isEmptyObject(memberships) && (
              <MembershipsChart
                membershipSeries={memberships.series}
                xaxis={memberships.xaxis}
              />
            )}
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            {!isEmptyObject(partners) && (
              <PartnerChart
                partnerSeries={partners.series}
                xaxis={partners.xaxis}
              />
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export function StatsCard({ item }) {
  return (
    <div className="rounded-lg p-6 bg-white shadow-md">
      <div className="flex justify-between">
        <div>
          <h5 className="text-gray-400 text-xs">{item.name}</h5>
          <h2>{item.value}</h2>
        </div>
        <div>
          <item.icon className="w-8 h-8 fill-primary stroke-primary stroke-0" />
        </div>
      </div>
    </div>
  );
}
