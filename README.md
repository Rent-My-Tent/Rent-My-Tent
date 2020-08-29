# Rent My Tent
> A peer-to-peer marketplace for used tents. Sell your tent. Hire a tent.

![Rent-my-tent.org](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/Website_mockup_RentMyTent.png?raw=true)

## Motivation
Often people purchase tents with only a single-use in mind. This means we have many tents, yet little utility. :angry:

In the UK its a particular problem at music festivals where [250,000 tents get left behind every year.](https://www.independent.co.uk/life-style/festivals-2019-tent-ban-single-use-plastic-waste-pollution-aif-a8904216.html) This becomes nearly 900 tonnes of plastic waste, most of which ends up in landfill.

Tents are multi-material - nylon, metal, plastic etc., so practically impossible to recycle. The average tent weighs 3.5kg and is mostly made of plastic - the equivalent of 8750 straws.

Read more about the problem [here](https://mixmag.net/read/festival-organisers-ban-disposable-tents-news), [here](https://www.telegraph.co.uk/news/2019/08/27/festival-goers-should-pay-25-fee-withheld-tent-abandoned-campaign/) and [here.](https://www.nme.com/features/festivals-abandoned-tents-waste-reduction-2382025)

## User Stories
* Toby  (see Toby's user persona on [Milanote](https://app.milanote.com/1J9Phh1KiYulbj))
  - As a tent owner I want to sell my tent so that I can get some money back for it whilst ensuring its put to good use / responsibly used.
* Rachel  (see Rachel's user persona on [Milanote](https://app.milanote.com/1J9Pro1KiYulbl))
  - As someone in the market for a tent I'd rather rent than own a tent, to save money and to depend on less stuff.

## Why?
[Rent My Tent](https://rent-my-tent.org/) can reduce the demand for tent ownership by bringing together people who have and people who need tents - in a simple online marketplace transaction.

By promoting tent utility / reuse, we can drive down the need for tent ownership.

**Less tent ownership** means less tents need to be manufactured, saving vital resources and reducing waste disposal.

## System Overview
Once a tent is added to the marketplace it will always be available for rent; except during rental periods when the tent is being used by the renter.

For a quick overview of how this works go [here](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/marketplace_explainer.md). To understand every interaction between a tent seller and a tent hirer check out this [marketplace design doc](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/MarketplaceDesign_RentMyTent.pdf).

## Key focus for UX
- Adding a tent to the marketplace - here's how it might look on [mobile and desktop](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/Accordian_tent_listing_flow.png)
- Automatically putting a tent back on the marketplace
- Communication / notifications that ensure the renter understands what is happening now that the rental period has come to an end

## How it works
### For tent sellers
- **List your tent** > Include some photos and a description
- **Sell your tent** > Get money for your idle tent
- **Save the planet** > When your tent is taken off your hands it will always be available here for rent
### For tent hirers
- **Find a tent to rent** > Choose from a wide range of good-quality used tents
- **Save money** > Pay for the rental and a refundable deposit
- **Select rental period** > Choose how long you want to keep the tent
- **Take care of the tent** > Once the rental period is up you’re the custodian until the next renter comes along

## Program Deliverables
* [Week One](#week-one)
* [Week Two](#week-two)
* [Week Three and Four](#week-three-and-four)
* [Week Five](#week-five)
* [Final week submission](#final-week-submission)

## Week One
* Why is blockchain needed to solve this problem?
  - Public blockchain infrastructure is well-suited to freely create and exchange unique digital representations of physical items - in our case - tents!
  - The marketplace we have in mind needs blockchain to hold tent-rental-deposits so the marketplace users don't have to depend on a central authority who could run off with those deposits.
* What demographics do you serve?
  - 250,000 tents are left at music festivals across the UK every year. Source: Association of Independent Festivals.
  - [Atomik Research](https://www.atomikresearch.co.uk/survey-finds-2000000-worth-of-tents-and-sleeping-bags-abandoned-each-year/) found that music fans take £795 of camping gear to festivals leave £200's worth behind.
* What is the size of the market? See page 5 in [pitch deck](https://docs.google.com/presentation/d/1pfMiXQ7ruqEg2t5wqel0RgIdHESrt7vAr_rtwXDiP0o/edit?usp=sharing)
* What other solutions are currently being used to address this problem?  See page 10 in [pitch deck](https://docs.google.com/presentation/d/1pfMiXQ7ruqEg2t5wqel0RgIdHESrt7vAr_rtwXDiP0o/edit?usp=sharing)
* What are the geopolitical, cultural-social-economic factors that must be taken into consideration?
  - Calls to ban retailers from selling "single-use" tents.
  - In a recent festival-goer-survey, 12% of respondents said they thought that a left tent would go to charity. It doesn’t.
  - Festival goers becoming more mindful in recent years.
  - Glastonbury claim that 99.3% of tents we're taken home last year. They've been asking attendees to adhere to the ‘Love The Farm, Leave No Trace’ pledge and leave their campsite as they found it.
* What are some nuances and complexities that must be addressed?
  - Bootstrapping a two-sided marketplace - the classic chicken & egg problem.
  - Trust.
  - Market dynamics.
  - Messaging.

## Week Two
* Who are your constituents/clients/users?
  - Tent owners, especially those who only have a single-use in mind.
  - Tent buyers, especially those who only have a single-use in mind.
* What are their pain points?
  - No easy way to buy or sell second hand tents.
* What is your product's value proposition?
  - Give your tent a new lease of life
  - A better future for your tent, a better future for the planet.
  - Tents are for life, not just festivals!
  - Keeping your tent under the stars
  - Pass on your tent
  - Adopt a tent
  - Pay it forward, with a tent!
  - No tent left behind
  - Your tent needs you (to think about the future!)
* What is your distribution and go-to-market strategy? Who can you partner with?
  - We can partner with festivals.
  - We can leverage Facebook Marketplace by messaging everyone who lists a tent to ask them if they know about our better way of doing things!
* What are the risks associated with your solution?
  - We can mitigate the risk that Facebook Marketplace takes over the world!
* What is the impact of your solution? How will it be measured?
  - The reuse of tents will drive down the production of them; helping save time, money, energy and resources.

## Week Three and Four
### Prototyping

By mocking up a Rent My Tent homepage we had a focal point and aid for our customer interviews.

At the same time we got to work on the marketplace design / system architecture by working out all of the interactions that Toby and Rachel will have with Rent My Tent, and with each other. This work is represented by this [complex diagram](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/MarketplaceDesign_RentMyTent.pdf).

### MVP testing
**Our testing approach**

We tested out the hypotheses we have for each side of Rent My Tent's marketplace by talking with prospective users.

On the **demand side** we wanted to see if people could grasp the concept and whether people would consider Rent My Tent being their go-to destination for hiring a used tent.

On the **supply side** Rent My Tent needs to be attractive to people who may be considering selling their tent.

Could our prospective users understand the intricacies / uniqueness of the concept?

Most importantly are they aware that on the supply side people are selling their tent (rather than renting it out), and on the demand side people hire a tent. And would the people who hire tents understand that they keep custody of it until the next rental comes along?

All conversations started with these basic questions: _do you own a tent?  when did you buy it?  when did you last use it?  where is it now?  when do you think you might use it again?  is that a concrete plan?_

**What we learned**

We found that the concept needed some explaining, mostly due to its uniqueness. The broad idea really started to resonate with people when we had the opportunity to explain it in terms of a [deposit return scheme](https://www.greenpeace.org.uk/news/deposit-return-schemes-what-exactly-are-they/) - something which people are very familiar with. Most of the people we spoke with wondered why _tent hirers_ would take care of the tent they hire and it was easy to answer this by drawing the comparison with general deposit return schemes. The deposit part of the fee paid by _tent hirers_ (deposit gets locked up in smart contract) incentivises them to take good care of their hired tent, helps to ensure it remains in good condition, and is available ready for the next rental.

## Week Five
[Pitch deck](https://docs.google.com/presentation/d/1pfMiXQ7ruqEg2t5wqel0RgIdHESrt7vAr_rtwXDiP0o/edit?usp=sharing)

## Final week submission
During the final week we produced a series of videos to represent this project:

- In this [7 min video](https://youtu.be/gKwf85RInG4) Kelvin gives a high level overview of the Rent My Tent marketplace, explaining its unique features.

- In this [10 min video](https://youtu.be/hIZE76YvB_0) Rob goes under the hood of his smart contracts to explain how the Rent My Tent marketplace is enabled by the Ethereum [ERC-721](http://erc721.org/) token standard.

- In this [7 min video](https://youtu.be/YrmwcxcaUg8) Rob walks you through Rent My Tent from the front-end web perspective, demonstrating the steps to list a tent on the marketplace.

- In this [series of videos](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/celo_demo.md) Jett demonstrates the mobile app functionality that he built using Celo's SDK.

---

To showcase Rent My Rent we developed two technical projects. Our [primary project](https://youthful-volhard-3a730f.netlify.com/), a working decentralised [web app](https://github.com/kelvinlockwood/Rent-My-Tent/tree/master/web), is built on Ethereum and the ERC-721 token standard. And our [secondary project](https://github.com/jettandres/rent-my-tent) is built on Celo's SDK.

Celo’s focus on being mobile-first and having a native stable currency offers a lot of promise to our project. We don’t want to expose our users to any complicated token economics or ask them to reason with the complexities of DAOs. We just need to make it easy to list a tent, easy to hire a tent and for locked up deposits to be safe from any threats. We also liked the idea of all users paying a $1 lifetime membership fee and that idea looked a good fit for Celo.

## Status
Project has been submitted for judging, _Plastics & Pollution_ and _Celo Peace & Prosperity_ categories. A [Decentralized Impact Incubator project.](https://blockchainforsocialimpact.com/incubator/)

## Next steps
Our next major goal is to pilot Rent My Tent at [Houghton Festival](https://www.houghtonfestival.co.uk/)
 in August of this year. We’ve had a warm response from [Amanda Eastwood](https://github.com/kelvinlockwood/Rent-My-Tent/blob/master/validation_from_festival_organiser.md)
 who is keen on the idea, however she doesn’t yet know if Houghton Festival will run this year due to the current Coronavirus crisis.

We’re also looking to take this project forward alongside opportunities in the blockchain space. We’ll be considering [MetaCartel](https://metacartel.xyz/), [The LAO](https://medium.com/@thelaoofficial/become-a-project-funded-by-the-lao-333e03cf5c) and [Celo Camp](https://medium.com/celoorg/announcing-celo-camp-f78ddf07e25d) in due course.

## Contact
Team formed by [Kelvin Lockwood](https://twitter.com/kelvinlockwood) - feel free to contact me!

_Our **Perpetual Deposit Return Scheme** concept has many applications beyond tents, by using [NFTs](https://opensea.io/blog/guides/non-fungible-tokens/) we represent real world items and then attach value to them so that theres always an incentive not to dispose of them._ :earth_americas:
