import { SetMetadata } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Subjects } from '../ability.factory';
import { Action } from '../action.enum';

export interface RequiredRules {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRules[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRules {
  action = Action.Read;
  subject = User;
}
