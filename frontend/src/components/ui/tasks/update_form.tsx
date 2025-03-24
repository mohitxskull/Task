import {
  Button,
  Divider,
  Group,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { gateTan } from "@/configs/gate_tan";
import { timeAgo } from "@/lib/helpers/date";
import { V1TaskShowRoute } from "@task/backend/blueprint";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { Form } from "@folie/gate-tan/components";
import { askConfirmation, HorizontalInput } from "@folie/cobalt/components";

type Props = {
  task: V1TaskShowRoute["output"]["task"];
  refetch: () => void;
};

export const TaskUpdateForm = (props: Props) => {
  const router = useRouter();

  const { form, inputProps, mutation } = gateTan.useForm({
    endpoint: "V1_TASK_UPDATE",

    initialValues: {
      params: {
        taskId: props.task.id,
      },
      title: props.task.title,
      body: props.task.body,
      important: props.task.important,
      completed: !!props.task.completedAt,
    },
    onSuccess: (updatedTask) => {
      notifications.show({
        message: updatedTask.message,
      });

      props.refetch();

      return {
        input: {
          ...updatedTask.task,
          params: {
            taskId: updatedTask.task.id,
          },
        },
        queryKeys: (qk) => [qk("V1_TASK_LIST")],
      };
    },
  });

  const deleteM = gateTan.useMutation({
    endpoint: "V1_TASK_DELETE",
    onSuccess: () => {
      router.push("/app/tasks");
    },
  });

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Stack gap={0}>
            <Title>{props.task.title}</Title>
            {props.task.body && (
              <Text size="sm" c="dimmed" maw={400} lineClamp={2}>
                {props.task.body}
              </Text>
            )}
          </Stack>

          <Text size="sm" c="dimmed">
            Updated {timeAgo(props.task.updatedAt)}{" "}
          </Text>
        </Group>

        <Divider />

        <Form mutation={mutation} submit={mutation.mutate} form={form}>
          {({ dirty, loading }) => (
            <>
              <HorizontalInput
                label="Completed"
                description="Toggle to mark the task as completed."
              >
                <Switch
                  {...inputProps("completed", {
                    type: "checkbox",
                  })}
                  key={form.key("completed")}
                />
              </HorizontalInput>

              <HorizontalInput
                label="Important"
                description="Toggle to mark the task as important."
              >
                <Switch
                  {...inputProps("completed", {
                    type: "checkbox",
                  })}
                  key={form.key("completed")}
                />
              </HorizontalInput>

              <HorizontalInput label="Title" description="Title of your task.">
                <TextInput
                  placeholder="Buy vegetables"
                  {...inputProps("title")}
                  key={form.key("title")}
                />
              </HorizontalInput>

              <HorizontalInput
                label="Details"
                description="Put details of your task here."
              >
                <Textarea
                  placeholder="Carrot, Potato, Onion, Tomato, Cucumber."
                  autosize
                  minRows={3}
                  maxRows={5}
                  {...inputProps("body")}
                  key={form.key("body")}
                />
              </HorizontalInput>

              <Group justify="space-between">
                <Button
                  disabled={loading}
                  color="red"
                  variant="outline"
                  onClick={async () => {
                    const confirmed = await askConfirmation({
                      message: `Are you sure you want to delete "${props.task.title}" task?`,
                      labels: {
                        confirm: "Yes, delete",
                        cancel: "No, keep",
                      },
                    });

                    if (confirmed) {
                      deleteM.mutate({
                        params: {
                          taskId: props.task.id,
                        },
                      });
                    }
                  }}
                >
                  Delete
                </Button>

                <Button type="submit" loading={loading} disabled={!dirty}>
                  Update
                </Button>
              </Group>
            </>
          )}
        </Form>
      </Stack>
    </>
  );
};
