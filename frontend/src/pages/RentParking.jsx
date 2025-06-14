import React from "react";
import StatCard from "../components/cards/StatCard";
import { Link } from "react-router-dom";

export default function RentParking() {
  return (
    <div className="p-16 m-5">
      <h2 className="text-4xl dark:text-white text-center mb-8">
        Let your parking space make money!
      </h2>
      <div className="row justify-content-center">
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Do not let the dotted lines go waste when you they can help you make
          money. If you have an extra parking space in your building, apartment
          or even your colony, convert it into a source of income by renting it
          out. Not only it will be gesture of help to the one who needs it but
          also makes you financially more stable.
        </p>
        <br />
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          All you need to do is register at SmartPark and become a member. Rent
          out your unused space online with us by sharing the details of
          location as well as the images and any customer who likes it as per
          their for an hourly, daily or even monthly basis depending in the
          availability of your parking space.
        </p>
        <br />
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          SmartPark is the perfect handcrafted solution that assists people in
          parking, making it a win-win situation for both the parties. You earn
          on the parking slots and it becomes a stress-free parking for the
          driver.
        </p>
        <br />
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          If you want to be a part of the revolutionary solution and have
          further queries regarding how renting parking spaces works, feel free
          to get in touch with SmartPark customer agents.
        </p>
        <br />
      </div>

      <h2 className="text-4xl dark:text-white text-center">
        Here is perfect example of how to rent out parking space
      </h2>
      <div className="flex flex-wrap -m-4 text-center p-24">
        <StatCard
          icon={<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
          value={<Link to="/login">Login Here</Link>}
          label="Login with Google, Facebook or your registered email id and password."
        />
        <StatCard
          icon={<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
          value="Fill Out the Form"
          label="Post your parking space and mention all the required details."
        />
        <StatCard
          icon={<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
          value="Once you publish"
          label="After the Ad published customer can view and book the same."
        />
        <StatCard
          icon={<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>}
          value="Get Paid"
          label="Once booked, you’ll receive a text message with date, time slot and payment status."
        />
      </div>

      <div className="p-8">
        <div className="bg-white p-4 rounded-lg shadow-xl py-8 mt-12">
          <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
            FAQ
          </h4>
          <p className="text-center text-gray-600 text-sm mt-2">
            Faqs for Let your parking space make money with SmartPark
          </p>
          <div className="space-y-12 px-2 xl:px-16 mt-12">
            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    How can I list my parking space on SmartPark to make money?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    Listing your parking space on SmartPark is easy. Simply
                    create an account, provide details about your parking space,
                    set your pricing, and make it available for others to book.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    Can I choose when my parking space is available for booking
                    on SmartPark?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    Absolutely. SmartPark allows you to set the availability of
                    your parking space, giving you control over when it can be
                    booked.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    How do I receive payments for renting out my parking space
                    on SmartPark?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    Payments are typically handled through the platform.
                    SmartPark may offer secure payment options, ensuring a
                    hassle-free transaction process.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    Are there any insurance considerations when renting out my
                    parking space?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    It's advisable to check with your insurance provider. Some
                    platforms, including SmartPark, may offer insurance coverage
                    for added peace of mind.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    Can I set different rates for different times or days on
                    SmartPark?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    Yes, SmartPark often allows you to customize pricing based
                    on factors such as time, day, and demand, giving you
                    flexibility in setting rates.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div>
                <div className="flex items-center h-16 border-l-4 border-blue-600">
                  <span className="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div className="flex items-center h-16 border-l-4 border-gray-400">
                  <span className="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center h-16">
                  <span className="text-lg text-blue-600 font-bold">
                    What types of parking spaces are popular on SmartPark for
                    making money?
                  </span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-gray-500">
                    Parking spaces near popular destinations, event venues, or
                    public transportation hubs are often popular on SmartPark
                    for making money.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
