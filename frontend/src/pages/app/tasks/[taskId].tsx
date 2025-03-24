import { AppLayout } from "@/components/layout/app";
import { gateServer } from "@/configs/gate_server";
import { gateTan } from "@/configs/gate_tan";
import { gateClient } from "@/configs/gate_client";
import { LocalQueryLoader } from "@/components/query_loader";
import { Container } from "@mantine/core";
import { taskCrumbs } from "@/lib/crumbs";
import { TaskUpdateForm } from "@/components/ui/tasks/update_form";

export const getServerSideProps = gateServer.checkpoint();

export default function Page() {
  const { isReady, param } = gateClient.useParams();

  const taskId = param.bind(null, "taskId");

  const taskQ = gateTan.useQuery({
    endpoint: "V1_TASK_SHOW",
    input: {
      params: {
        taskId: taskId(),
      },
    },
    enabled: isReady,
  });

  return (
    <>
      <AppLayout
        crumbs={taskCrumbs.get([
          {
            label: taskQ.data?.task.title || "Loading...",
            href: taskId(),
          },
        ])}
      >
        <Container my="xl">
          <LocalQueryLoader query={taskQ}>
            {({ task }) => (
              <>
                <TaskUpdateForm task={task} refetch={taskQ.refetch} />
              </>
            )}
          </LocalQueryLoader>
        </Container>
      </AppLayout>
    </>
  );
}
