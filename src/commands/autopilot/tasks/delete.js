const {flags} = require('@oclif/command'),
      { TwilioClientCommand } = require('@twilio/cli-core').baseCommands,
      AutopilotCore = require('@dabblelab/autopilot-core'),
      ora = require('ora');
      
class DeleteAssistantTask extends TwilioClientCommand {
  
    async runCommand() {

        let { flags } = this.parse(DeleteAssistantTask);

        if (!flags.hasOwnProperty('assistantSid')) {
            console.log(`The '--assistantSid' is required`);
            return;
        }

        if(!flags.taskSid){
            console.log(`The '--taskSid' is required`);
            return;
        }

        const spinner = ora().start('Deleting assistant task...\n');
        try{

            const taskSid = flags.taskSid,
                  assistantSid = flags.assistantSid;

            const task = await AutopilotCore.tasks.remove(this.twilioClient, assistantSid, taskSid);
            spinner.stop();
            console.log(`Removed task with UniqueName: ${task.uniqueName}`);
        }catch(err){

            spinner.stop();
            
            console.error(`ERROR: ${err}`);
        }
    }
  
}

DeleteAssistantTask.description = `Delete a Task of an assistant`;

DeleteAssistantTask.flags = Object.assign(
  {
    assistantSid : flags.string({
        char : 's',
        description : 'assistant that owns the task',
        required : true
    }),
    taskSid : flags.string({
        description : 'task sid',
        required : true
    })
  },
  TwilioClientCommand.flags
)

module.exports = DeleteAssistantTask;
