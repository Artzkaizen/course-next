import { parseRoles } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import ky from "ky";
import { z } from "zod";

export const LaunchRequestLegacy = z.object({
  user_id: z.string(),
  lis_person_sourcedid: z.string(),
  roles: z.string(),
  context_id: z.string(),
  context_label: z.string(),
  context_title: z.string(),
  lti_message_type: z.string(),
  resource_link_title: z.string(),
  resource_link_description: z.string(),
  resource_link_id: z.string(),
  context_type: z.string(),
  lis_course_section_sourcedid: z.string(),
  launch_presentation_locale: z.string(),
  ext_lms: z.string(),
  tool_consumer_info_product_family_code: z.string(),
  tool_consumer_info_version: z.string(),
  oauth_callback: z.string(),
  lti_version: z.string(),
  tool_consumer_instance_guid: z.string(),
  tool_consumer_instance_name: z.string(),
  tool_consumer_instance_description: z.string(),
  launch_presentation_document_target: z.string(),
  launch_presentation_return_url: z.string(),
});

type Group = {
  id: string;
  name: string;
};

export const fetchUserDetails = async (userid: number, courseid: number) => {
  const response = await ky
    .get(
      `https://staging.b-trend.digital/local/news/user.php?userid=${userid}&courseid=${courseid}`,
    )
    .json<Group[]>();
  return response;
};

export const LaunchRequestAdvantage = z.object({
  iss: z.string(),
  target_link_uri: z.string().url(),
  login_hint: z.string(),
  lti_message_hint: z.string(),
  client_id: z.string(),
  lti_deployment_id: z.string(),
});
export const launchRouter = createTRPCRouter({
  launchLti: publicProcedure
    .input(LaunchRequestLegacy)
    .query(async ({ input }) => {
      const groups = await fetchUserDetails(
        parseInt(input.user_id),
        parseInt(input.context_id),
      );
      const user = {
        id: input.user_id,
        courseid: input.context_id,
        roles: parseRoles(input.roles),
        groups,
      };

      return user;
    }),
});
