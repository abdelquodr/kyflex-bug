import TeamWork from '../assets/images/team_work.jpg';
import TeamMeeting from '../assets/images/team_meeting.jpg';
import FreshStart from '../assets/images/fresh_start.jpg';
import CommunityGathering from '../assets/images/community_gathering.jpg';
import Stairs from '../assets/images/stairs.jpg';
import JobInterview from '../assets/images/job_interview.jpg';
/*
    This data is Careers data.
*/

const CareersInfo = [{
  title: 'About us', url: "/about", link: 'What drives us', image: TeamWork
}, {
  title: 'Teams', url: "/team", link: 'Explore teams', image: TeamMeeting
}, {
  title: 'Blog', url: "/blog", link: 'Read latest news', image: FreshStart
}, {
  title: 'Community', url: "/community", link: 'Learn More', image: CommunityGathering
}];


const OpenPositions = [{
  title: 'Hiring process', url: "/hiring", link: 'Hiring insights', image: Stairs
}, {
  title: 'Job opportunities', url: "/opening-positions", link: 'View opening positions', image: JobInterview
}];

export { CareersInfo, OpenPositions };
